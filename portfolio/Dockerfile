FROM nginx:alpine

# Serve the static portfolio (landing page, RAG chat page, downloadable CV)
COPY index.html chat.html analytics.js Kaustubh_Trivedi_CV.pdf portrait.webp /usr/share/nginx/html/
COPY posthog-config.sh /docker-entrypoint.d/40-posthog-config.sh
RUN chmod +x /docker-entrypoint.d/40-posthog-config.sh
COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
