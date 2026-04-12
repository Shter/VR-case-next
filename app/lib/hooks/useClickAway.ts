import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { defaultEvents } from "@/app/constants";
import type { ClickAwayOptions } from "@/types/allTypes";

const useClickAwayHeader = (
    ref: RefObject<HTMLElement | null>,
    onClickAway: (event: Event) => void,
    options: ClickAwayOptions = {},
) => {
    const { events = defaultEvents, ignoreRefs = [] } = options;
    const savedCallback = useRef(onClickAway);
    const ignoreRefsRef = useRef(ignoreRefs);

    useEffect(() => {
        savedCallback.current = onClickAway;
    }, [onClickAway]);

    useEffect(() => {
        ignoreRefsRef.current = ignoreRefs;
    }, [ignoreRefs]);

    useEffect(() => {
        const handler: EventListener = event => {
            const element = ref.current;
            const target = event.target;

            if (!element || !(target instanceof Node)) {
                return;
            }

            const shouldIgnore = ignoreRefsRef.current.some(ignoreRef => {
                const ignoreElement = ignoreRef.current;
                return Boolean(ignoreElement && ignoreElement.contains(target));
            });

            if (shouldIgnore) {
                return;
            }

            if (!element.contains(target)) {
                savedCallback.current(event);
            }
        };

        for (const eventName of events) {
            window.addEventListener(eventName, handler);
        }

        return () => {
            for (const eventName of events) {
                window.removeEventListener(eventName, handler);
            }
        };
    }, [events, ref]);
};

export default useClickAwayHeader;
