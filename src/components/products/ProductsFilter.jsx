import { Checkbox } from "../ui/checkbox";

export default function ProductsFilter({ name }) {
    return (
        <div className="flex items-center gap-4">
            <Checkbox className="w-5 h-5 border-[#4065DD] data-[state=checked]:bg-[#4065DD] data-[state=checked]:border-[#4065DD]" />
            <h3 className="text-lg">{name}</h3>
        </div>
    );
}
