# Install
    use pnpm (on Vercel as well)
    use node version higher then 20.9.0 (example 22.6.0)
    on vercel dont overwrite the commands only the env variables
    right now the plugins dont work, need to wait for a newer version of th plugins

# Env File
It should look similar to this or the variables on the vercel app.
    MONGODB_URI= String to connect with MogoDB
    PAYLOAD_SECRET= Hash for encrypting the Passwords
    NEXT_PUBLIC_API_URL= The public URL of the vercel with /api at the end like: http://localhost/api
    PAYLOAD_PUBLIC_SERVER_URL= The public vercel URL or http://localhost:3000
    BLOB_READ_WRITE_TOKEN= String to connect with the Vercel Blob storage


# Beispiel Website:
    https://payload-3-0-demo-mocha.vercel.app/