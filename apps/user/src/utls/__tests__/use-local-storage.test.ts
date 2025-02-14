import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useLocalStorage } from "../use-local-storage";

describe("useLocalStorage", () => {
	afterEach(() => {
		localStorage.clear();
	});

	it("should return initial empty value when nothing is stored", () => {
		const { result } = renderHook(() => useLocalStorage("theme"));
		expect(result.current[0]).toBeUndefined();
	});

	it("should store and retrieve theme value", () => {
		const { result } = renderHook(() => useLocalStorage("theme"));

		act(() => {
			result.current[1]("dark");
		});

		expect(result.current[0]).toBe("dark");
		expect(localStorage.getItem("user_app_storage")).toBe(JSON.stringify({ theme: "dark" }));
	});

	it("should store and retrieve user value", () => {
		const { result } = renderHook(() => useLocalStorage("user"));
		const testUser = { email: "test@example.com" };

		act(() => {
			result.current[1](testUser);
		});

		expect(result.current[0]).toEqual(testUser);
		expect(localStorage.getItem("user_app_storage")).toBe(JSON.stringify({ user: testUser }));
	});

	it("should handle multiple hooks accessing different keys", () => {
		const { result: themeHook } = renderHook(() => useLocalStorage("theme"));
		const { result: userHook } = renderHook(() => useLocalStorage("user"));
		const testUser = { email: "test@example.com" };

		act(() => {
			themeHook.current[1]("light");
		});

		act(() => {
			userHook.current[1](testUser);
		});

		expect(themeHook.current[0]).toBe("light");
		expect(userHook.current[0]).toMatchObject(testUser);
		expect(localStorage.getItem("user_app_storage")).toBe(JSON.stringify({ theme: "light", user: testUser }));
	});

	it("should persist values between hook re-renders", () => {
		const { result, rerender } = renderHook(() => useLocalStorage("theme"));

		act(() => {
			result.current[1]("dark");
		});

		rerender();

		expect(result.current[0]).toBe("dark");
	});

	it("should handle loginRedirectPath correctly", () => {
		const { result } = renderHook(() => useLocalStorage("loginRedirectPath"));
		const testPath = "/dashboard";

		act(() => {
			result.current[1](testPath);
		});

		expect(result.current[0]).toBe(testPath);
		expect(localStorage.getItem("user_app_storage")).toBe(JSON.stringify({ loginRedirectPath: testPath }));
	});
});
