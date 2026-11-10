#!/usr/bin/env bash
# Downloads the Figma assets into ./assets. Run from the repo root:  bash scripts/fetch-assets.sh
# The Figma asset URLs expire after 7 days. If a download fails, re-export the asset from Figma
# (Export section of the layer) using the file names below.
set -euo pipefail

B="https://www.figma.com/api/mcp/asset"
get() { curl -fL --silent --show-error "$B/$2" -o "assets/$1" && echo "ok  $1"; }
get hero-shape.svg         d8d7dbf7-8702-4572-81de-668cf6e1488d.svg
get sd-favicon-icon.svg    8bf6203c-9565-4eae-a71b-a63f8ac20673.svg
get ellipse-1.svg          2555bd52-6be5-4583-865a-477a81c2d2ff.svg
get card-back-light-v1.png 8da544a6-efe3-421d-afd5-629d67881d69.png
get card-back-pink-v1.png  60b08466-a3d2-4fe5-be81-b64fc2c53ace.png
get image-20.png           a1d5d86b-5282-41de-af5a-9b12c7e7dd29.png
get image-17.png           fcfc731c-f47b-4787-b093-e27f400d487e.png
get union.svg              2f25d766-dddb-4a15-a7df-6f61710a3f10.svg
get union-1.svg            4025e3ba-3f57-4d5c-b049-cade419236bb.svg
get sd-favicon.svg         90642f0e-e79d-4cf0-98c2-f77ec034092c.svg
get back-ellipse.svg       8e32c9fa-8942-495e-9337-2d95ad1ff635.svg
