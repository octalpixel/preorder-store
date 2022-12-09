import { Module } from 'medusa-extender';
import { BannerService } from './banner.service';
import { BannerRouter } from './banner.router';
import { Banner } from './banner.entity';
import { BannerMigration1668916109122 } from './1668916109122-banner.migration';
import { BannerRepository } from './banner.repository';

@Module({
    imports: [BannerMigration1668916109122, Banner, BannerRouter, BannerService, BannerRepository]
})
export class BannerModule {}