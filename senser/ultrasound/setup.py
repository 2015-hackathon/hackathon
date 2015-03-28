from setuptools import setup, find_packages

setup(
    name = 'ultrasound',
    version = '1.10.27',
    keywords = ('Raspberry', 'ultrasound'),
    description = 'Ultrasound wave sensor modal for Raspberry, get distance and speed',
    license = 'GPL',
    install_requires = ['RPi.GPIO'],

    author = 'xiaocao',
    author_email = 'xiaocao.grasses@gmail.com',
    author_site = 'http://homeway.me',
    packages = find_packages(),
    platforms = 'Raspberry Linux',
)