import ProductSearch from "@/components/product/ProductSearch";
import ProductImages from "@/components/product/ProductImages";
import ProductDescription from "@/components/product/ProductDescription";
import Wrapper from "@/components/Wrapper";

export default function Page() {
    return (
        <Wrapper>
            <div className="px-16">
                <ProductSearch />
                <div className="flex mt-16 gap-16">
                    <ProductImages />
                    <ProductDescription />
                </div>
            </div>
        </Wrapper>
    );
}
