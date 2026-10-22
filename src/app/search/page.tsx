import SearchList from '@/common/UI/SearchList/SearchList'

type Props = {
	searchParams: Promise<{
		query?: string | string[]
	}>
}

const SearchPage = async ({ searchParams }: Props) => {
	const params = await searchParams
	const query = Array.isArray(params.query) ? params.query[0] : params.query

	return <SearchList key={query ?? ''} query={query} />
}

export default SearchPage
