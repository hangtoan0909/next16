# ============================
# Stage 1: Base install deps
# ============================
FROM node:20.9.0-alpine AS base

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Install dependencies (yarn / npm / pnpm)
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# ============================
# Stage 2: Build Next.js app
# ============================
FROM base AS builder

WORKDIR /app
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi


# ============================
# Stage 3: Runtime image
# ============================
FROM node:20.9.0-alpine

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Tạo user/group không phải root
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 --ingroup nodejs nextjs

# Copy file đã build từ stage builder
# Dùng --chown để set owner đúng ngay từ lúc copy
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Đảm bảo thư mục cache tồn tại và thuộc quyền nextjs
RUN mkdir -p .next/cache && chown -R nextjs:nodejs .next

# Chạy app dưới user nextjs
USER nextjs

# App trong container chạy ở port 5000
EXPOSE 5000
ENV PORT=5000

CMD ["node", "server.js"]
