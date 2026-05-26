import SearchList from '@/common/UI/SearchList/SearchList'

type Props = {
	searchParams: Promise<{
		query?: string
	}>
}

const SearchPage = async ({ searchParams }: Props) => {
	const { query } = await searchParams

	return <SearchList query={query} />
}

export default SearchPage
