import { faqItems } from "@/app/constants";

export function Faq() {
    const labelClass = "relative flex cursor-pointer items-center gap-4 rounded-xl px-5 py-4 pr-14 text-left text-base font-semibold text-white transition-colors peer-checked:bg-white/10 after:absolute after:right-5 after:flex after:h-8 after:w-8 after:items-center after:justify-center after:rounded-full after:border after:text-sm after:font-semibold after:text-white/80 after:content-['+'] peer-checked:after:border-transparent peer-checked:after:bg-accent peer-checked:after:text-black peer-checked:after:content-['-']";
    const itemClass = "max-h-0 overflow-hidden px-5 text-left text-sm leading-relaxed text-white/80 transition-all duration-300 peer-checked:max-h-96 peer-checked:pb-4 peer-checked:pt-2 peer-checked:opacity-100";

    return (
        <aside className="flex w-full flex-col text-center text-white lg:w-[45%] lg:max-h-[680px] lg:overflow-y-auto">
            <h2 className="pb-5 text-3xl font-bold md:text-4xl">
                Todo lo que querés saber antes de vivir la VR
            </h2>

            <ul className="space-y-2 lg:pr-4">
                {faqItems.map((item, index) => {
                    const inputId = `faq-toggle-${item.id}`;
                    const labelId = `${inputId}-label`;

                    return (
                        <li key={item.id}>
                            <div className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur transition">
                                <input
                                    type="radio"
                                    name="faq-toggle-group"
                                    id={inputId}
                                    className="peer sr-only"
                                    defaultChecked={index === 0}
                                />
                                <label
                                    id={labelId}
                                    htmlFor={inputId}
                                    className={labelClass}
                                >
                                    {item.question}
                                </label>

                                <div
                                    id={`faq-panel-${item.id}`}
                                    role="region"
                                    aria-labelledby={labelId}
                                    className={itemClass}
                                >
                                    {item.answer}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
