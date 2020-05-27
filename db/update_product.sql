update product
set description = $1
where product_id = $2
returning *;