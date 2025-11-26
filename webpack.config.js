import { resolve as _resolve } from 'path';

export const mode = 'production';
export const entry = './src/index.jsx';
export const output = {
    filename: 'bundle.js',
    path: _resolve(__dirname, 'build'),
};
export const module = {
    rules: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env'],
                },
            },
        },
    ],
};
export const resolve = {
    extensions: ['.js', '.jsx'],
};