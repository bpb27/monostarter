import * as _trpc_server from '@trpc/server';
import * as _trpc_server_unstable_core_do_not_import from '@trpc/server/unstable-core-do-not-import';

declare const appRouter: _trpc_server_unstable_core_do_not_import.BuiltRouter<{
    ctx: object;
    meta: object;
    errorShape: {
        data: {
            validation: {
                readonly [x: string]: [string, ...string[]] | undefined;
            } | undefined;
            code: _trpc_server_unstable_core_do_not_import.TRPC_ERROR_CODE_KEY;
            httpStatus: number;
            path?: string;
            stack?: string;
        };
        message: string;
        code: _trpc_server_unstable_core_do_not_import.TRPC_ERROR_CODE_NUMBER;
    } | {
        data: {
            cause: Error | undefined;
            code: _trpc_server_unstable_core_do_not_import.TRPC_ERROR_CODE_KEY;
            httpStatus: number;
            path?: string;
            stack?: string;
        };
        message: string;
        code: _trpc_server_unstable_core_do_not_import.TRPC_ERROR_CODE_NUMBER;
    };
    transformer: false;
}, _trpc_server_unstable_core_do_not_import.DecorateCreateRouterOptions<{
    users: _trpc_server_unstable_core_do_not_import.BuiltRouter<{
        ctx: object;
        meta: object;
        errorShape: {
            data: {
                validation: {
                    readonly [x: string]: [string, ...string[]] | undefined;
                } | undefined;
                code: _trpc_server_unstable_core_do_not_import.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server_unstable_core_do_not_import.TRPC_ERROR_CODE_NUMBER;
        } | {
            data: {
                cause: Error | undefined;
                code: _trpc_server_unstable_core_do_not_import.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server_unstable_core_do_not_import.TRPC_ERROR_CODE_NUMBER;
        };
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
            } | undefined;
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
        };
    }>;
}>>;
type AppRouter = typeof appRouter;

export type { AppRouter };
