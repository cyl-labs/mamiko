import { Skeleton } from "../ui/skeleton";

export default function ProductsItemSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            <Skeleton className="aspect-square rounded-xl" />
            <div className="flex flex-col gap-4">
                <Skeleton className="h-4" />
                <Skeleton className="h-4" />
            </div>
        </div>
    );
}
