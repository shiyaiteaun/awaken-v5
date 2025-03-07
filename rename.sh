for file in data/blog/posts/planda/*.md.mdx; do
    mv -- "$file" "${file%.md.mdx}n.mdx"
done

# move this into intended directory, then cd in and run