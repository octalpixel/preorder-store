import { router, publicProcedure, protectedProcedure } from "../trpc";

export const dbRouter = router({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  
});
