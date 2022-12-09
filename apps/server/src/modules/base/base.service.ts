import { Service } from 'medusa-extender'
import { EntityManager, ILike } from 'typeorm'
import { EventBusService, TransactionBaseService } from '@medusajs/medusa'
import { FindConfig, Selector } from '@medusajs/medusa/dist/types/common'
import { buildQuery, isString } from '@medusajs/medusa/dist/utils'
import { MedusaError } from 'medusa-core-utils'

@Service()
export class BaseService extends TransactionBaseService {
  protected static resolutionKey: string = ''
  protected manager_: EntityManager
  protected transactionManager_: EntityManager
  protected eventBus_: EventBusService
  protected repository_: any;

  constructor({
    manager,
    repository,
    eventBusService
  }) {
    super(arguments[0])
    this.manager_ = manager
    this.repository_ = repository
    this.eventBus_ = eventBusService
  }

  /**
   * Retrieves a record by id.
   * @param id - the id of the record to retrieve
   * @param config - the config to retrieve the tag by
   * @return the collection.
   */
   async retrieve<T>(
    id: string,
    config: FindConfig<T> = {}
  ): Promise<T> {
    const repo = this.manager_.getCustomRepository<any>(this.repository_)

    const query = buildQuery({ id: id }, config)
    const record = await repo.findOne(query as any)

    if (!record) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Record with id: ${id} was not found`
      )
    }

    return record as T
  }

  /**
   * Creates a record
   * @param tag - the record to create
   * @return created record
   */
  async create<T>(body: Partial<T>): Promise<T> {
    return await this.atomicPhase_(async (manager: EntityManager) => {
      const repo = manager.getCustomRepository<any>(this.repository_)

      const record = repo.create(body) as T
      return await repo.save(record)
    })
  }

    /**
   * Updates a given record with a new value
   * @param noteId - the id of the record to update
   * @param value - the new value
   * @return resolves to the updated element
   */
     async update<T>(id: string, value: Partial<T>): Promise<T> {
        return await this.atomicPhase_(async (manager) => {
          const repo = manager.getCustomRepository<any>(this.repository_)
    
          const record = await this.retrieve<T>(id, { relations: ["author"] })
          Object.assign(record, value);
    
          const result = await repo.save(record)
    
          return result
        })
      }
  /**
   * Lists records
   * @param selector - the query object for find
   * @param config - the config to be used for find
   * @return the result of the find operation
   */
  async list<T>(
    selector: Selector<T> & {
      q?: string
    } = {},
    config: FindConfig<T> = { skip: 0, take: 20 }
  ): Promise<T[]> {
    const [records] = await this.listAndCount<T>(selector, config)
    return records
  }

  /**
   * Lists records and adds count.
   * @param selector - the query object for find
   * @param config - the config to be used for find
   * @return the result of the find operation
   */
  async listAndCount<T>(
    selector: Selector<T> & {
      q?: string
    } = {},
    config: FindConfig<T> = { skip: 0, take: 20 }
  ): Promise<[T[], number]> {
    const repo = this.manager_.getCustomRepository<any>(this.repository_)

    let q: string | undefined
    if (isString(selector.q)) {
      q = selector.q
      delete selector.q
    }

    const query = buildQuery(selector, config)

    if (q) {
      (query.where as any).value = ILike(`%${q}%`)
    }

    return (await repo.findAndCount(query as any)) as [T[], number]
  }

  /**
   * Deletes a record from a given record id.
   * @param {string} id - the id of the record to delete. Must be
   *   castable as an ObjectId
   * @return {Promise} the result of the delete operation.
   */
   async delete<T>(id: string): Promise<void> {
    // return await this.atomicPhase_(async (manager: EntityManager) => {
      const repo = this.manager_.getCustomRepository<any>(this.repository_)
      
      // Should not fail, if user does not exist, since delete is idempotent
      const record = await repo.findOne({ where: { id } })

      if (!record) {
        return Promise.resolve()
      }
      return await repo.softRemove(record)

    //   return Promise.resolve()
    // })
  }
}
