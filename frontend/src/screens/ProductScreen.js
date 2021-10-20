import { getProduct } from "../api";
import Rating from "../component/rating";
import { hideLoading, parseRequestUrl, showLoading } from "../utils";

const ProductScreen = {
        after_render: async() => {
            //Find ID product from URL
            const request = parseRequestUrl()
            document.getElementById('add-button').addEventListener('click',
                () => {
                    document.location.hash = `/cart/${request.id}`
                }
            )
        },
        render: async() => {
                const request = parseRequestUrl();
                showLoading()
                const product = await getProduct(request.id);

                if (product.error) {
                    return `<h1>${product.error}</h1>`;
                }
                hideLoading()
                return `
        <div class="content">
            <div class="back-to-result">
                <a href="/#/">Back to result</a>
            </div>
            <div class="details">
                <div class="details-info">
                    <img src="${product.img}" alt="${product.name}" />              
                    <ul class="fw">
                        <li>
                            <h1>${product.name}</h1>
                        </li>
                        <li>
                            ${Rating.render({value: product.rating, text: `${product.numReviews} Review`})}
                        </li>
                        <li>
                            By(author): ${product.author}
                        </li>
                        <li>
                        Description: ${product.description}
                        </li>
                    </ul>
                </div>
                <div class="details-action">
                    <ul>
                        <li>
                            US$${product.price}
                        </li>
                        <li>
                        Status : 
                        ${product.countInStock > 0 ? `<span class="success"> In Stock</span>` : `<span class="error">Unvailable</span>`}
                        </li>
                        <li>
                        <button id="add-button" class="primary fw">Add to Cart</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        `;
    }
};

export default ProductScreen;