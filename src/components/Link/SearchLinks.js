import React from "react";
import FireBaseContext from "../../firebase/context";
import LinkItem from "./LinkItem";

function SearchLinks() {
    const { firebase } = React.useContext(FireBaseContext);
    const [filteredLinks, setFilteredLinks] = React.useState([]);
    const [links, setLinks] = React.useState([]);
    const [filter, setFilter] = React.useState("");

    React.useEffect(() => {
        getInitialLinks();
    }, []);

    function getInitialLinks() {
        firebase.db.collection("links").get().then(snapshot => {
            const links = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })

            setLinks(links);
        });
    }

    function handleSearch(event) {
        event.preventDefault();
        const query = filter.toLowerCase();

        const matchedLinks = links.filter(link => {
            const description = link.description.toLowerCase().includes(query);
            const url = link.url.toLowerCase().includes(query);
            const name = link.postedBy.name.toLowerCase().includes(query);

            return description || url || name;
        });

        setFilteredLinks(matchedLinks);
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <div>
                    Search <input onChange={event => setFilter(event.target.value)} />
                    <button>OK</button>
                </div>
            </form>
            {filteredLinks.map((filteredLinks, index) => (
                <LinkItem key={filteredLinks} showCount={false} link={filteredLinks} index={index} />
            ))}
        </div>
    );
}

export default SearchLinks;
