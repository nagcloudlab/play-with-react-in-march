import { getProduct } from '../../../../lib/products';

export async function GET(request, { params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) {
    return Response.json({ error: 'Product not found' }, { status: 404 });
  }
  return Response.json(product);
}
