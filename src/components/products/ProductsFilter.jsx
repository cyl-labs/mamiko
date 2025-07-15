import { Checkbox } from "../ui/checkbox";

export default function ProductsFilter({ name }) {
    return (
        <div className="flex items-center gap-4">
            <Checkbox className="w-5 h-5" />
            <h3 className="text-lg">{name}</h3>
        </div>
    );
}
