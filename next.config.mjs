import withSvgr from 'next-svgr'

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['image.openmoviedb.com', 'avatars.mds.yandex.net'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'image.tmdb.org',
			},
		],
	},
}

export default withSvgr(nextConfig)
