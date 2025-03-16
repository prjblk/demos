# Use the official Nginx image to serve static files
FROM nginx:alpine

# Copy the malicious frontend files to the Nginx HTML directory
COPY index.html /usr/share/nginx/html/index.html

# Expose port 80
EXPOSE 80
