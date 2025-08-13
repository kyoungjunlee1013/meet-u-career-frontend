# --- build stage ---
FROM node:18-alpine AS build
WORKDIR /app

# 의존성 설치 (캐시 최적화)
COPY package*.json ./
RUN npm ci

# 소스 복사 및 빌드
COPY . .
RUN npm run build

# --- run stage ---
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev

EXPOSE 3000
CMD ["npm","start"]
