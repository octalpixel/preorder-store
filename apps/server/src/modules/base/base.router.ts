import { MedusaAuthenticatedRequest, RoutesInjectionRouterConfiguration, MedusaRouteMethods, Router } from 'medusa-extender';
import { Response, NextFunction, RequestHandler } from "express";

type handler = (req: MedusaAuthenticatedRequest, res: Response) => Promise<any>

export const wrap = (fn: handler): RequestHandler => {
    return (req: MedusaAuthenticatedRequest, res: Response, next: NextFunction) => {
      if (req?.errors?.length) {
        return res.status(400).json({
          errors: req.errors,
          message:
            "Provided request body contains errors. Please check the data and retry the request",
        })
      }
      return fn(req, res).catch(next)
    }
  }

export const getBaseRouters = <T, S>(serviceName, baseRouter) => {
    
    return [
        getListRouter<T, S>(serviceName, baseRouter),
        getRouter<T, S>(serviceName, baseRouter),
        getCreateRouter<T, S>(serviceName, baseRouter),
        getUpdateRouter<T, S>(serviceName, baseRouter),
        getDeleteRouter<T, S>(serviceName, baseRouter),
    ] 
}

export const getListRouter = <T, S>(serviceName, baseRouter): RoutesInjectionRouterConfiguration => ({
    requiredAuth: false,
    path: `${baseRouter}`,
    method: 'get',
    handlers: [
        wrap(async (req: MedusaAuthenticatedRequest, res: Response): Promise<Response<T[]>> => {
            /* You can create a function in a separate find and just imported it here. */
            const service = req.scope.resolve<S>(serviceName);
            //@ts-ignore
            const records = await service.list<T>(req.params)
            return res.send(records);
        })
    ]
})

export const getRouter = <T, S>(serviceName, baseRouter): RoutesInjectionRouterConfiguration => ({
    requiredAuth: false,
    path: `${baseRouter}/:id`,
    method: 'get',
    handlers: [
        wrap(async (req: MedusaAuthenticatedRequest, res: Response): Promise<Response<T>> => {
            /* You can create a function in a separate find and just imported it here. */
            const service = req.scope.resolve<S>(serviceName);
            //@ts-ignore
            const record = await service.retrieve<T>(req.params?.id)
            return res.send(record);
        })
    ]
})

export const getCreateRouter = <T, S>(serviceName, baseRouter): RoutesInjectionRouterConfiguration => ({
    requiredAuth: false,
    path: `${baseRouter}`,
    method: 'post',
    handlers: [
        wrap(async (req: MedusaAuthenticatedRequest, res: Response): Promise<Response<T>> => {
            /* You can create a function in a separate find and just imported it here. */
            const service = req.scope.resolve<S>(serviceName);
            //@ts-ignore
            const record = await service.create<T>(req.body)
            return res.send(record);
        })
    ]
})

export const getUpdateRouter = <T, S>(serviceName, baseRouter): RoutesInjectionRouterConfiguration => ({
    requiredAuth: false,
    path: `${baseRouter}/:id`,
    method: 'post',
    handlers: [
        wrap(async (req: MedusaAuthenticatedRequest, res: Response): Promise<Response<T>> => {
            /* You can create a function in a separate find and just imported it here. */
            const service = req.scope.resolve<S>(serviceName);
            //@ts-ignore
            const record = await service.update<T>(req.params.id, req.body)
            return res.send(record);
        })
    ]
})

export const getDeleteRouter = <T, S>(serviceName, baseRouter): RoutesInjectionRouterConfiguration => ({
    requiredAuth: false,
    path: `${baseRouter}/:id`,
    method: 'delete',
    handlers: [
        wrap(async (req: MedusaAuthenticatedRequest, res: Response): Promise<Response<T[]>> => {
            /* You can create a function in a separate find and just imported it here. */
            const service = req.scope.resolve<S>(serviceName);
            //@ts-ignore
            const record = await service.delete<T>(req.params.id)
            return res.send(record);
        }),
    ]
})