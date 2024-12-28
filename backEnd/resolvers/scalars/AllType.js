import { GraphQLScalarType, Kind } from 'graphql';

const AllType = new GraphQLScalarType({
    name: 'AllType',
    description: 'Um tipo genérico que aceita qualquer valor',
    serialize(value) {
        return value; // Transformar o valor antes de enviá-lo ao cliente
    },
    parseValue(value) {
        return value; // Validar ou transformar o valor de entrada
    },
    parseLiteral(ast) {
        switch (ast.kind) {
            case Kind.STRING:
                return ast.value;
            case Kind.INT:
                return parseInt(ast.value, 10);
            case Kind.FLOAT:
                return parseFloat(ast.value);
            case Kind.BOOLEAN:
                return ast.value === "true";
            case Kind.OBJECT:
                return ast.value;
            default:
                return null;
        }
    },
});

export default AllType;