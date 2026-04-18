<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
  const supabaseUrl = "https://hzaheralbzykhqqilozl.supabase.co";
  const supabaseKey = "sb_publishable_47641yzp6iSoO7hpmkXXHQ__E98_MvF";
  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  async function addToCart(productId) {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      swal("Login required", "Please login to add items to cart", "warning");
      return;
    }

    const { error } = await supabase
      .from("cart_items")
      .insert({
        userid: user.id,
        product_id: productId,
        quantity: 1
      });

    if (error) {
      console.error(error);
      swal("Error", error.message, "error");
    } else {
      swal("Success", "Item added to cart", "success");
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".add-to-cart").forEach(btn => {
      btn.addEventListener("click", () => {
        addToCart(btn.dataset.productId);
      });
    });
  });
</script>
