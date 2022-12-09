import { EventBusService } from '@medusajs/medusa';
import { Service } from 'medusa-extender'
import { EntityManager, ILike } from 'typeorm'
import { BannerRepository } from './banner.repository'
import { BaseService } from '../base/base.service'

type InjectedDependencies = {
  manager: EntityManager,
  bannerRepository: typeof BannerRepository,
  eventBusService: EventBusService
}

@Service()
export class BannerService extends BaseService {
  static resolutionKey = 'bannerService'
  repository_: typeof BannerRepository
//   protected readonly eventBus_: EventBusService

  constructor({
    manager,
    bannerRepository,
    eventBusService,
  }: InjectedDependencies) {
    super({manager, repository: bannerRepository, eventBusService})
  }
}
