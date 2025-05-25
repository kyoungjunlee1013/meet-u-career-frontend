# Node Alpine 베이스 이미지 사용
FROM node:alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 전체 소스 복사
COPY . .

# 프로덕션 빌드 수행
RUN npm run build

# Next.js 기본 포트
EXPOSE 3000

# ENTRYPOINT와 CMD로 서버 실행
ENTRYPOINT ["/bin/sh", "-c"]
CMD ["npm run start"]
