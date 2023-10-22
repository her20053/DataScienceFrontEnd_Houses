import { Grid, Skeleton, Container } from '@mantine/core';
import { Image } from '@mantine/core';

const child = <Skeleton height={140} radius="md" animate={false} />;

import Imagen1 from '../../images/correlacion.png';
import Imagen2 from '../../images/pairplot1.png';
import Imagen3 from '../../images/pairplot2.png';

export function GridAsymmetrical() {
    return (
        <Container style={{ width: "100vw", marginTop: "200px" }}>
            <Grid>
                <Grid.Col span={{ base: 12, xs: 8 }}>{
                    <Image
                        radius="md"
                        src={Imagen1}
                    />
                }</Grid.Col>
                <Grid.Col span={{ base: 12, xs: 12 }}>{
                    <Image
                        radius="md"
                        src={Imagen2}
                    />
                }</Grid.Col>
                <Grid.Col span={{ base: 12, xs: 12 }}>{
                    <Image
                        radius="md"
                        src={Imagen3}
                    />
                }</Grid.Col>
            </Grid>
        </Container>
    );
}