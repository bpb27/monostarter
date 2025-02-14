import { useCallback, useEffect, useState } from "react";
import * as v from "valibot";

const STORAGE_KEY = "user_app_storage";

const AppLocalStorageSchema = v.object({
	user: v.optional(v.object({ email: v.pipe(v.string(), v.email()) })),
	theme: v.optional(v.picklist(["light", "dark", "inherit"])),
	loginRedirectPath: v.optional(v.pipe(v.string(), v.startsWith("/"))),
});

type AppLocalStorage = v.InferOutput<typeof AppLocalStorageSchema>;

function getStoredState(): AppLocalStorage {
	try {
		const storedData = localStorage.getItem(STORAGE_KEY);
		return storedData ? JSON.parse(storedData) : {};
	} catch (error) {
		console.error("Error reading localStorage:", error);
		return {};
	}
}

export function useLocalStorage<T extends keyof AppLocalStorage>(key: T) {
	const [storage, setStorage] = useState(getStoredState);

	const setValue = useCallback(
		(value: AppLocalStorage[T]) => {
			setStorage({ ...getStoredState(), [key]: value });
		},
		[key],
	);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
	}, [storage]);

	return [storage[key], setValue] as const;
}
