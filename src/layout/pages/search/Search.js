import './Search.scss';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';

function Search() {
  return (
    <div>
      <InputGroup className="mt-3">
        <FormControl
          placeholder="Rechercher..."
          aria-label="Rechercher"
        />
        <InputGroup.Append>
          <Button variant="outline-primary"><Icon path={mdiMagnify}></Icon></Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}

export default Search;
