module.exports = async ({github, context}) => {
  try {
    const last_tag_json = await github.request('GET /repos/{owner}/{repo}/releases/latest', {
      owner: context.repo.owner,
      repo: context.repo.repo
    })
    const last_tag_array = last_tag_json.data.tag_name.split('')
    last_tag_array.shift()
    const last_tag_number = last_tag_array.join('') 
    const release = await github.request('POST /repos/{owner}/{repo}/releases', {
      owner: context.repo.owner,
      repo: context.repo.repo,
      tag_name: 'v'+ (parseFloat(last_tag_number) + parseFloat("0.1")).toFixed(1),
      name: 'v'+ (parseFloat(last_tag_number) + parseFloat("0.1")).toFixed(1),
      target_commitish: 'master',
      generate_release_notes: true
    })
    console.log(release)
    const release_note = await github.request('POST /repos/{owner}/{repo}/releases/generate-notes', {
      owner: context.repo.owner,
      repo: context.repo.repo,
      tag_name: 'v'+ (parseFloat(last_tag_number) + parseFloat("0.1")).toFixed(1),
      target_commitish: 'master',
      previous_tag_name: 'v'+ (parseFloat(last_tag_number)).toFixed(1),
      configuration_file_path: '.github/release.yml'
    })
    console.log(release_note)
  }
  catch(error) {
     await github.request('POST /repos/{owner}/{repo}/releases', {
      owner: context.repo.owner,
      repo: context.repo.repo,      
      tag_name: 'v1.0',
      name: 'v1.0',
      target_commitish: 'master',
      generate_release_notes: true
    }) 
    await github.request('POST /repos/{owner}/{repo}/releases/generate-notes', {
      owner: context.repo.owner,
      repo: context.repo.repo,      
      tag_name: 'v1.0',
      target_commitish: 'master',
      previous_tag_name: 'v1.0',
      configuration_file_path: '.github/release.yml'
    })      
  }
}
