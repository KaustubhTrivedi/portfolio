FROM nginx:alpine

# Serve the static portfolio (landing page, RAG chat page, downloadable CV)
COPY index.html chat.html Kaustubh_Trivedi_CV.pdf /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
