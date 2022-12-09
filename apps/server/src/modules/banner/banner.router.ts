import { MedusaAuthenticatedRequest, Router } from 'medusa-extender';
import { BannerService } from './banner.service';
import { Banner } from './banner.entity';
import { getBaseRouters } from '../base/base.router';

@Router({
    routes: getBaseRouters<Banner, BannerService>('bannerService', '/store/banner')
        
})
export class BannerRouter {}