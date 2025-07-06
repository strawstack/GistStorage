import { Octokit } from "https://esm.sh/octokit";

function makeDiv(content, onClick) {
    const div = document.createElement("div");
    div.className = "gist";
    div.innerHTML = content;
    div.addEventListener("click", onClick);
    return div;
}

async function getGists(token) {
    const octokit = new Octokit({
        auth: token
    });

    const gists = await octokit.request('GET /gists', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    for (const { files } of gists.data) {
        for (const key in files) {
            const { filename, raw_url } = files[key];
            
            list.appendChild(makeDiv(filename, async e => {
                const response = await fetch(raw_url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const content = await response.text();
                editor.innerHTML = content;
            }));

            break; // Only get first file in Gist
        }    
    }
}

export async function main({ list, editor, connectLink }) {

    const state = {
        token: null
    };

    connectLink.addEventListener("click", e => {
        e.preventDefault();
        

    });

    /* 
    // Create Gist 
    await octokit.request('POST /gists', {
        description: 'Example of a gist',
        'public': true,
        files: {
            'README.md': {
                content: 'Hello World'
            }
        },
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }); */
}