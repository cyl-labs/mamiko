import ProductSearch from "@/components/product/ProductSearch";
import ProductImages from "@/components/product/ProductImages";
import ProductDescription from "@/components/product/ProductDescription";
import Wrapper from "@/components/Wrapper";
import Navbar from "@/components/general/navbar";
import Footer from "@/components/general/footer";

export default function Page() {
    return (
        <Wrapper>
            <Navbar />
            <div className="px-16">
                <ProductSearch />
                <div className="flex mt-16 gap-16">
                    <ProductImages />
                    <ProductDescription />
                </div>
            </div>
            <Footer />
        </Wrapper>
    );
}
