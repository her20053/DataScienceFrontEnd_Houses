import React, { useState } from 'react';
import { Welcome } from '../components/Welcome/Welcome';
import { NavbarSegmented } from '../components/NavbarSegmented/NavbarSegment';

import { GridAsymmetrical } from '../components/GridAsymmetrical/GridAsymmetrical';

import { Select, TextInput, NumberInput, Slider, Switch, Button } from '@mantine/core';
import classes from './ContainedInput.module.css';
import classesSlider from './SliderInput.module.css';

export function HomePage() {
  const [section, setSection] = useState<'account' | 'general'>('account');

  return (
    <div style={containerStyle}>
      <NavbarSegmented section={section} onSectionChange={setSection} />
      {section === 'account' ? <ModeloForm /> : <ExtrasComponent />}
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
};

const margenStyle: React.CSSProperties = {
  marginTop: '30px',
  marginBottom: '30px',
};

function ExtrasComponent() {
  return <GridAsymmetrical />;
}

const cityMapping: { [key: string]: number } = {
  'São Paulo': 0,
  'Porto Alegre': 1,
  'Rio de Janeiro': 2,
  'Campinas': 3,
  'Belo Horizonte': 4,
};

function ModeloForm() {
  const [ciudad, setCiudad] = useState<string | null>('');
  const [area, setArea] = useState<number | string>(250);
  const [rooms, setRooms] = useState<number | string>(5);
  const [restRooms, setRestRooms] = useState<number | string>(3);
  const [casaAmueblada, setCasaAmueblada] = useState(false);
  const [seguro, setSeguro] = useState<number | string>(3);

  const handleSubmit = async () => {
    const cityIndex = cityMapping[ciudad || ''] || 0;
    const response = await fetch('http://127.0.0.1:5000/modelo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        city: cityIndex,
        area: Number(area),
        rooms: Number(rooms),
        bathroom: Number(restRooms),
        furniture: casaAmueblada ? 1 : 0,
        'fire insurance (R$)': Number(seguro),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      alert(`Predicción: ${data.prediccion}`);  // Mostrando el resultado en un popup
    } else {
      const data = await response.json();
      alert(`Error: ${data.error}`);  // Mostrando el mensaje de error en un popup
    }
  };

  return (
    <>
      <div style={{ width: "50vw", marginLeft: "10%", marginTop: "10%" }}>
        <Select
          style={{ marginBottom: "25px" }}
          mt="md"
          comboboxProps={{ withinPortal: true }}
          data={['São Paulo', 'Porto Alegre', 'Rio de Janeiro', 'Campinas', 'Belo Horizonte']}
          placeholder="Porfavor escoge una ciudad"
          label="Ciudad"
          classNames={classes}
          value={ciudad}
          onChange={(value) => setCiudad(value || '')}
        />
        <SliderInput value={area} onChange={setArea} label="Area (m²)" min={10} max={500} step={10} />
        <SliderInput value={rooms} onChange={setRooms} label="Cantidad de cuartos" min={1} max={10} step={1} />
        <SliderInput value={restRooms} onChange={setRestRooms} label="Cantidad de baños" min={1} max={10} step={1} />
        <Switch style={margenStyle} label="Casa amueblada" checked={casaAmueblada} onChange={(event) => setCasaAmueblada(event.currentTarget.checked)} />
        <SliderInput value={seguro} onChange={setSeguro} label="Seguro contra fuego" min={0} max={230} step={10} />
        <Button fullWidth onClick={handleSubmit}>Enviar</Button>
      </div>
    </>
  );
}

interface SliderInputProps {
  value: number | string;
  onChange: (value: number | string) => void;
  label: string;
  min: number;
  max: number;
  step: number;
}

function SliderInput({ value, onChange, label, min, max, step }: SliderInputProps) {
  return (
    <div className={classesSlider.wrapper} style={margenStyle}>
      <NumberInput
        value={value}
        onChange={onChange}
        label={label}
        step={step}
        min={min}
        max={max}
        hideControls
        classNames={{ input: classesSlider.input, label: classesSlider.label }}
      />
      <Slider
        max={max}
        step={step}
        min={min}
        label={null}
        value={typeof value === 'string' ? 0 : Number(value)}
        onChange={onChange}
        size={2}
        className={classesSlider.slider}
        classNames={classesSlider}
      />
    </div>
  );
}
