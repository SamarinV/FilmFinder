import SearchList from '@/common/UI/SearchList/SearchList'

const SearchPage = async ({ searchParams }: { searchParams: { query?: string } }) => {
	const query = searchParams.query

	return <SearchList query={query} />
}

export default SearchPage
