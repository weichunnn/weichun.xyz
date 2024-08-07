blog:
	@if [ -z "$(name)" ]; then \
		echo "Error: Please provide a filename using name=<filename>"; \
		exit 1; \
	fi
	@filename=`echo $(name) | tr '[:upper:]' '[:lower:]' | sed -e 's/[^a-zA-Z0-9]/-/g' | sed -e 's/--*/-/g'`; \
	echo "---" > content/$$filename.mdx; \
	echo "title: $(name)" >> content/$$filename.mdx; \
	echo "publishedAt: $(shell TZ='America/Los_Angeles' date +"%Y-%m-%dT%H:%M:%S%z")" >> content/$$filename.mdx; \
	echo "---" >> content/$$filename.mdx;
