import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { defaultEvents } from "@/app/constants";

const useClickAwayHeader = (
    ref: RefObject<HTMLElement | null>,
    onClickAway: (event: Event) => void,
    events: Array<keyof WindowEventMap> = defaultEvents,
) => {
    const savedCallback = useRef(onClickAway);

    useEffect(() => {
        savedCallback.current = onClickAway;
    }, [onClickAway]);

    useEffect(() => {
        const handler: EventListener = event => {
            const element = ref.current;
            const target = event.target;

            if (!element || !(target instanceof Node)) {
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