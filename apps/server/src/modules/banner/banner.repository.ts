import { EntityRepository, Repository } from "typeorm";

import { Repository as MedusaRepository } from "medusa-extender";
import { Banner } from './banner.entity';

@MedusaRepository()
@EntityRepository(Banner)
export class BannerRepository extends Repository<Banner> {}