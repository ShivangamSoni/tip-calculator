import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Icons } from "./assets";

import Header from "@components/Header";
import Display from "@components/Calculator/Display";
import Form from "@components/Calculator/Form";

const TIPS = ["5", "10", "15", "25", "50"] as const;
const CalculatorSchema = z.object({
    bill: z
        .number({
            invalid_type_error: "Can only be Number",
        })
        .min(1, "Can't be less than one"),
    numberOfPeople: z
        .number({
            invalid_type_error: "Can only be Number",
        })
        .min(1, "Can't be less than one"),
    tip: z.enum(["custom", ...TIPS]),
    customTip: z
        .number({
            invalid_type_error: "Can only be Number",
        })
        .or(z.nan()),
});
type CalculatorState = z.infer<typeof CalculatorSchema>;

export default function App() {
    const {
        register,
        reset,
        trigger,
        watch,
        setValue,
        formState: { errors },
    } = useForm<CalculatorState>({
        resolver: zodResolver(CalculatorSchema),
        defaultValues: {
            bill: 0,
            numberOfPeople: 0,
        },
    });

    const tip = watch("tip");
    const bill = watch("bill");
    const numberOfPeople = watch("numberOfPeople");
    const customTip = watch("customTip");

    const tipValue = tip === "custom" ? customTip : parseFloat(tip ?? 0);
    const tipAmount = (bill / 100) * tipValue;
    let tipPerPerson = tipAmount / numberOfPeople;
    tipPerPerson = isFinite(tipPerPerson) ? tipPerPerson : 0;

    const total = bill + tipAmount;
    let totalPerPerson = total / numberOfPeople;
    totalPerPerson = isFinite(totalPerPerson) ? totalPerPerson : 0;

    return (
        <div className="flex md:items-center justify-center min-h-screen bg-neutral-100 font-space">
            <section className="grid gap-10 md:gap-20 w-full max-w-[920px]">
                <Header />
                <div className="grid grid-col-1 md:grid-cols-2 px-7 py-9 md:p-9 gap-9 md:gap-5 rounded-t-3xl md:rounded-3xl bg-white shadow-2xl">
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Form.Field
                            label="Bill"
                            error={errors.bill?.message || ""}
                        >
                            <Form.InputField
                                {...register("bill", {
                                    valueAsNumber: true,
                                    onChange: () => trigger(),
                                })}
                                type="number"
                                IconBefore={Icons.DollarIcon}
                                error={!!errors.bill || false}
                            />
                        </Form.Field>

                        <Form.Field
                            label="Select Tip %"
                            error={errors.tip?.message || ""}
                        >
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {TIPS.map((val) => (
                                    <Form.RadioButton
                                        {...(register("tip"),
                                        {
                                            onChange: (e) => {
                                                setValue("tip", val);
                                                setValue("customTip", NaN);
                                                trigger();
                                            },
                                        })}
                                        key={val}
                                        name="tip"
                                        value={val}
                                        checked={tip === val}
                                        label={`${val}%`}
                                    />
                                ))}

                                <Form.InputField
                                    {...register("customTip", {
                                        valueAsNumber: true,
                                        onChange: (e) => {
                                            const value =
                                                e.target.valueAsNumber;
                                            if (isNaN(value) || value <= 0) {
                                                setValue("tip", TIPS[0]);
                                                setValue("customTip", NaN);
                                            } else {
                                                setValue("tip", "custom");
                                            }

                                            trigger();
                                        },
                                    })}
                                    type="number"
                                    label="Custom"
                                    required={false}
                                />
                            </div>
                        </Form.Field>

                        <Form.Field
                            label="Number of People"
                            error={errors.numberOfPeople?.message || ""}
                        >
                            <Form.InputField
                                {...register("numberOfPeople", {
                                    valueAsNumber: true,
                                    onChange: () => trigger(),
                                })}
                                type="number"
                                IconBefore={Icons.PersonIcon}
                                error={!!errors.bill || false}
                            />
                        </Form.Field>
                    </Form>

                    <Display
                        action={
                            <Display.Button onClick={() => reset()}>
                                Reset
                            </Display.Button>
                        }
                    >
                        <Display.Item
                            title="tip amount"
                            subtitle="/ person"
                            cost={tipPerPerson.toFixed(2)}
                        />
                        <Display.Item
                            title="Total Amount"
                            subtitle="/ person"
                            cost={totalPerPerson.toFixed(2)}
                        />
                    </Display>
                </div>
            </section>
        </div>
    );
}
