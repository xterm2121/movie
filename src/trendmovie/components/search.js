import React from 'react'
import { BrowserRouter, Switch, Route,
    Link
} from 'react-router-dom';
import Info from './info'
const baseUrl = "https://api.themoviedb.org/3/search/multi";
const api_key = "?api_key=bf778d6e7fcbcce9f305a06c2863f504";
const plus = "&language=en-US&page=1&"

export default class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            input:'',
            search:[]
        }
        this.handleSearch = this.handleSearch.bind()
    }
    handleSearch = async (event) =>{
        event.preventDefault()
        const searchStr = event.target.elements.search.value;
        
        const res = searchStr.replace(/ /gi, '+')
        const searchUrl =baseUrl+api_key+plus+"query="+res
        this.setState({
            input:res
        })
        fetch(searchUrl)
            .then(res => res.json())
            .then(data =>{
                this.setState({search:data.results})
                console.log("data "+data)
                this.state.search ? console.log('success', this.state.search) : console.log('oops.. is empty')
            })
        console.log(this.state.search)
    }
    render(){
        const {input, search} = this.state
        const searchUrl =baseUrl+api_key+plus+"query="+input
        console.log(search)
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/"/>
                    <Route path="/search/:id" exact component={Info}/>
                </Switch>
            
                <div className="content">
                    <div className="search">                                                                                                                                                                                      
                        <Form loadsearchc={this.handleSearch}/>
                        <h4>{input}</h4>
                        <h4>{searchUrl}</h4>
                        <ul>
                            {search.map(s => (
                                <li key={s.release_date+s.id}>
                                    <Link to={`/search/${s.id}`} >{s.title}</Link>
                                </li>
                            ))}
                        </ul>
                        
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}
const Form = props => {
    return(
        <div className="container">
            <form onSubmit={props.loadsearchc}>
                <div>
                        <input type="text"  name="search" autoComplete="off" placeholder="Search"/>
                        <button >Search</button>                    
                </div>
            </form>
        </div>
    );
}