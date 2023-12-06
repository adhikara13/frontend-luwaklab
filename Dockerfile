# Use an official Node.js runtime with version 18.x as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy only the specific files and directories you mentioned
COPY astro.config.mjs .
COPY package.json .
COPY src ./src
COPY tsconfig.json .
COPY README.md .
COPY netlify.toml .
COPY package-lock.json .
COPY public ./public
COPY tailwind.config.cjs .
COPY vscode.tailwind.json .

# Expose the port your Astro application will run on (if not 3000, replace it)
EXPOSE 3000

# Build your Astro project
RUN npm install

# Set environment variables from .env
ARG SUPABASE_ANON_KEY
ARG SUPABASE_URL
ENV SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
ENV SUPABASE_URL=$SUPABASE_URL

# Start your Astro application
CMD ["npm", "run", "start"]
