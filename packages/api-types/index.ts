import * as _trpc_server from '@trpc/server';
import * as _trpc_server_unstable_core_do_not_import from '@trpc/server/unstable-core-do-not-import';

declare const appRouter: _trpc_server_unstable_core_do_not_import.BuiltRouter<{
    ctx: object;
    meta: object;
    errorShape: _trpc_server_unstable_core_do_not_import.DefaultErrorShape;
    transformer: false;
}, _trpc_server_unstable_core_do_not_import.DecorateCreateRouterOptions<{
    users: _trpc_server_unstable_core_do_not_import.BuiltRouter<{
        ctx: object;
        meta: object;
        errorShape: _trpc_server_unstable_core_do_not_import.DefaultErrorShape;
        transformer: false;
    }, _trpc_server_unstable_core_do_not_import.DecorateCreateRouterOptions<{
        getById: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: string;
            };
            output: {
                id: string;
                createdAt: Date;
                email: string;
                firstName: string;
                lastName: string;
                passwordHash: string;
                updatedAt: Date;
            };
        }>;
    }>>;
    login: _trpc_server.TRPCMutationProcedure<{
        input: {
            email: string;
            password: string;
        };
        output: {
            id: string;
            email: string;
            isRad: boolean;
        };
    }>;
}>>;
type AppRouter = typeof appRouter;

export type { AppRouter };
