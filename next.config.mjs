import withSvgr from 'next-svgr'

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'image.tmdb.org',
			},
			{
				protocol: 'https',
				hostname: 'image.openmoviedb.com',
			},
			{
				protocol: 'https',
				hostname: 'avatars.mds.yandex.net',
			},
		],
	},
}

export default withSvgr(nextConfig)
