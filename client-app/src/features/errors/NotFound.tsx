import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";


export default function NotFound () {
  return (
    <Segment placeholder>
        <Header icon>
            <Icon name="search"/>
            Ooops - we looked everywhere could not find what you looking for
        </Header>
        <Segment.Inline>
            <Button as={Link} to='/activities'>
                Return to activities pape
            </Button>
        </Segment.Inline>
    </Segment>
  )
}

