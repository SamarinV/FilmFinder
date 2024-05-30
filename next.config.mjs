import withSvgr from 'next-svgr';

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['image.openmoviedb.com'],
	},
};

export default withSvgr(nextConfig);
