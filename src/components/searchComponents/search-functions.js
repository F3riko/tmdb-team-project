import { useEffect } from "react";

function useSort(sortOption, homeList, searchResults, setSearchResults, displayedList, setDisplayedList) {
    useEffect(
        () => {
            let listToSort = searchResults.length > 0 ? searchResults : homeList
            if (sortOption === "title") {
                setDisplayedList([...listToSort].sort((a, b) => a.title.localeCompare(b.title)));
            } else if (sortOption === "year") {
                setDisplayedList([...listToSort].sort((a, b) => new Date(a.release_date).getFullYear() - new Date(b.release_date).getFullYear()));
            } else {
                setDisplayedList(listToSort);
            }
        }, [sortOption, searchResults, homeList]
    )
};

export {
    useSort
};