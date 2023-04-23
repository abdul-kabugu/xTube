const { withIpfsGateway } = require("@crossbell/ipfs-gateway-next");

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withIpfsGateway(nextConfig);
